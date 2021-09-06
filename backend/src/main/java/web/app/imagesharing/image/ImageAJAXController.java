package web.app.imagesharing.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import web.app.imagesharing.image.service.ImageService;
import web.app.imagesharing.image.service.SearchImageResponse;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ImageAJAXController {
    @Autowired
    ImageService imageService;

    private static final int PAGE_SIZE = 10;

    @GetMapping("/images")
    public SearchImageAJAXResponse listImages(@RequestParam(value = "pageIndex", defaultValue = "1") int pageIndex) {
        System.out.println(pageIndex);
        int skip = (pageIndex - 1) * PAGE_SIZE;
        SearchImageResponse searchImageResponse = imageService.listImages(skip, PAGE_SIZE);
        var response = new SearchImageAJAXResponse();
        response.images = images(searchImageResponse.images);
        response.totalPages = (int) Math.ceil(searchImageResponse.totalRecords / (double) PAGE_SIZE);
        response.totalRecords = searchImageResponse.totalRecords;
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
}
