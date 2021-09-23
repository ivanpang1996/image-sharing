package web.app.imagesharing.image.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.app.imagesharing.image.domain.Image;
import web.app.imagesharing.image.repository.ImageRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService {
    @Autowired
    ImageRepository imageRepository;

    public SearchImageResponse listImages(int skip, int limit) {
        List<Image> images = imageRepository.search(skip, limit);
        var response = new SearchImageResponse();
        response.images = images(images);
        response.totalRecords = (int) imageRepository.count();
        return response;
    }

    public UploadImageResponse upload(UploadImageRequest request) {
        var image = new Image();
        image.author = request.author;
        image.imageURL = request.imageURL;
        image.caption = request.caption;
        image.createdTime = LocalDateTime.now();
        imageRepository.save(image);
        var response = new UploadImageResponse();
        response.success = true;
        return response;
    }

    private List<SearchImageResponse.Image> images(List<Image> images) {
        return images.stream().map(image -> {
            var view = new SearchImageResponse.Image();
            view.author = image.author;
            view.imageURL = image.imageURL;
            view.caption = image.caption;
            view.createdTime = image.createdTime;
            return view;
        }).collect(Collectors.toList());
    }
}
