package web.app.imagesharing.image;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import web.app.imagesharing.image.service.ImageService;
import web.app.imagesharing.image.service.SearchImageResponse;
import web.app.imagesharing.image.service.UploadImageRequest;
import web.app.imagesharing.image.service.UploadImageResponse;
import web.app.imagesharing.user.domain.LoginUser;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
public class ImageAJAXController {
    @Autowired
    ImageService imageService;
    @Autowired
    private AmazonS3 amazonS3Client;

    @Value("${application.bucket.name}")
    private String bucketName;

    private static final int PAGE_SIZE = 10;

    @GetMapping("/api/images")
    public SearchImageAJAXResponse listImages(@RequestParam(value = "pageIndex", defaultValue = "1") int pageIndex) {
        var response = new SearchImageAJAXResponse();
        if (pageIndex < 1) return response;
        int skip = (pageIndex - 1) * PAGE_SIZE;
        SearchImageResponse searchImageResponse = imageService.listImages(skip, PAGE_SIZE);
        response.images = images(searchImageResponse.images);
        response.totalPages = (int) Math.ceil(searchImageResponse.totalRecords / (double) PAGE_SIZE);
        response.totalRecords = searchImageResponse.totalRecords;
        return response;
    }

    @PostMapping("/api/image")
    //TODO: not done yet
    public UploadImageAJAXResponse upload(@RequestParam("image") MultipartFile file, @RequestParam("caption") String caption) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        LoginUser loginUser = (LoginUser) auth.getPrincipal();
        var uploadRequest = new UploadImageRequest();
        var response = new UploadImageAJAXResponse();
        String url = uploadFileToS3(UUID.randomUUID().toString(), file);
        if (url == null) {
            response.success = false;
            return response;
        }
        uploadRequest.imageURL = url;
        uploadRequest.author = loginUser.getUsername();
        uploadRequest.caption = caption;
        UploadImageResponse uploadResponse = imageService.upload(uploadRequest);
        response.success = uploadResponse.success;
        return response;
    }

    public String uploadFileToS3(String keyName, MultipartFile file) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            amazonS3Client.putObject(bucketName, keyName, file.getInputStream(), metadata);
            return "File uploaded: " + keyName;
        } catch (Exception e) {
            return null;
        }
    }

    private List<SearchImageAJAXResponse.Image> images(List<SearchImageResponse.Image> images) {
        return images.stream().map(image -> {
            var view = new SearchImageAJAXResponse.Image();
            view.author = image.author;
            view.imageURL = image.imageURL;
            view.caption = image.caption;
            view.createdTime = image.createdTime;
            return view;
        }).collect(Collectors.toList());
    }

    private boolean isLoggedIn(Authentication auth) {
        return (auth != null && auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken));
    }
}
