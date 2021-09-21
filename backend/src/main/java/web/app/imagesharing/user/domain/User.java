package web.app.imagesharing.user.domain;

import javax.persistence.*;

@Entity
public class User {
    public User() {}

    public User(String id, String name, String password, String defaultAddress, UserType type) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.defaultAddress = defaultAddress;
        this.type = type;
    }

    @Id
    public String id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public String password;

    @Column
    public String defaultAddress;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    public UserType type;
}