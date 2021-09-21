package web.app.imagesharing.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import web.app.imagesharing.user.domain.LoginUser;
import web.app.imagesharing.user.domain.User;
import web.app.imagesharing.user.domain.UserType;
import web.app.imagesharing.user.repository.UserRepository;

import java.util.UUID;

@RestController
public class UserAJAXController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/api/user-info")
    public UserInfoAJAXResponse userInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        LoginUser loginUser = (LoginUser) auth.getPrincipal();
        var response = new UserInfoAJAXResponse();
        response.email = loginUser.getUsername();
        return response;
    }

    @PostMapping("/api/signup")
    public SignUpAJAXResponse signUp(@RequestBody SignUpAJAXRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        var response = new SignUpAJAXResponse();
        if (isLoggedIn(auth)) {
            response.success = false;
            return response;
        }

        if (userRepository.findByName(request.username).isPresent()) {
            response.success = false;
            response.errorCode = SignUpAJAXResponse.ErrorCode.USER_EXIST;
            return response;
        }

        User user = new User();
        user.id = UUID.randomUUID().toString();
        user.name = request.username;
        user.password = passwordEncoder.encode(request.password);
        user.type = UserType.USER;
        userRepository.save(user);

        response.success = true;
        return response;
    }

    private boolean isLoggedIn(Authentication auth) {
        return  (auth != null && auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken));
    }
}
