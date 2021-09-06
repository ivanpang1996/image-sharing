package web.app.imagesharing.image;

import java.time.LocalDateTime;
import java.util.List;

public class SearchImageAJAXResponse {
    public List<Image> images;

    public Integer totalPages;

    public Integer totalRecords;

    public static class Image {
        public String author;
        public String imageURL;
        public String caption;
        public LocalDateTime createdTime;
    }
}
