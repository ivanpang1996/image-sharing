package web.app.imagesharing.image.domain;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Image {
    @Id
    @Column(length = 64)
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Column(nullable = false)
    public String author;

    @Column(nullable = true)
    public String caption;

    @Column(length = 1500, nullable = false)
    public String imageURL;

    @Column(nullable = false)
    public LocalDateTime createdTime;
}