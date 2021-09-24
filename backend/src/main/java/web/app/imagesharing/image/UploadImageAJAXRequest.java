package web.app.imagesharing.image;

import org.springframework.web.multipart.MultipartFile;

public class UploadImageAJAXRequest {
    public MultipartFile image;
    public String caption;
}
