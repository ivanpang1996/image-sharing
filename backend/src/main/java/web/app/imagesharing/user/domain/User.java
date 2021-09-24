package web.app.imagesharing.user.domain;

import javax.persistence.*;

@Entity
public class User {
    public User() {}

    public User(String id, String name, String password, UserType type) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.type = type;
    }

    @Id
    public String id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    public UserType type;
}