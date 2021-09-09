package web.app.imagesharing.login;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Login {
    @PostMapping("/api/login")
    public LoginResponse login() {
        var response = new LoginResponse();
        response.aaa = "successsss";
        return response;
    }

    static class LoginResponse {
        public String aaa;
    }
}
