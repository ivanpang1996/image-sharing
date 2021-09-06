package web.app.imagesharing.login;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Login {
    @GetMapping("/api/login")
    public LoginResponse login() {
        var response = new LoginResponse();
        response.aaa = "successsss";
        return response;
    }

    static class LoginResponse {
        public String aaa;
    }
}
