package web.app.imagesharing.image;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class SearchImageAJAXResponse {
    public List<Image> images = new ArrayList<>();

    public Integer totalPages = 0;

    public Integer totalRecords = 0;

    public static class Image {
        public String author;
        public String imageURL;
        public String caption;
        public LocalDateTime createdTime;
    }
}
