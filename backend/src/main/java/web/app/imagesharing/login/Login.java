package web.app.imagesharing.login;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Login {
    @GetMapping("/api/login")
    public String login() {
        return "Success!!";
    }
}
