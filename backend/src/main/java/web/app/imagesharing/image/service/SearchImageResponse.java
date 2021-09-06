package web.app.imagesharing.image.service;

import java.time.LocalDateTime;
import java.util.List;

public class SearchImageResponse {
    public List<Image> images;

    public Integer totalRecords;

    public static class Image {
        public String author;
        public String imageURL;
        public String caption;
        public LocalDateTime createdTime;
    }
}
