package web.app.imagesharing.user.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import web.app.imagesharing.user.domain.LoginUser;
import web.app.imagesharing.user.domain.User;
import web.app.imagesharing.user.repository.UserRepository;

@Service
public class UserAuthenticationService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        User user = userRepository.findByName(name).orElseThrow(() -> new UsernameNotFoundException("user not found"));
        return new LoginUser(user);
    }
}
