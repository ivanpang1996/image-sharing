package web.app.imagesharing.image.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import web.app.imagesharing.image.domain.Image;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, String> {
    @Query(nativeQuery = true, value = "select * from image limit :skip, :limit")
    List<Image> search(@Param("skip") int skip, @Param("limit") int limit);
}
