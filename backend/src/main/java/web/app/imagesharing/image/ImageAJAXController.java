package web.app.imagesharing.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import web.app.imagesharing.image.service.ImageService;
import web.app.imagesharing.image.service.SearchImageResponse;
import web.app.imagesharing.image.service.UploadImageRequest;
import web.app.imagesharing.image.service.UploadImageResponse;
import web.app.imagesharing.user.domain.LoginUser;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ImageAJAXController {
    @Autowired
    ImageService imageService;

    private static final int PAGE_SIZE = 1;

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
    public UploadImageAJAXResponse upload(@RequestBody UploadImageAJAXRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        LoginUser loginUser = (LoginUser) auth.getPrincipal();
        var uploadRequest = new UploadImageRequest();
        uploadRequest.author = loginUser.getUsername();
        uploadRequest.caption = request.caption;
        uploadRequest.imageURL = request.imageURL;
        UploadImageResponse uploadResponse = imageService.upload(uploadRequest);
        var response = new UploadImageAJAXResponse();
        response.success = uploadResponse.success;
        return response;
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
