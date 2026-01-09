package com.egroupbuy.security;


import com.egroupbuy.dao.AdminDA;
import com.egroupbuy.dao.UserDA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class ApplicationConfig {


    @Autowired
    AdminDA adminDA;

//    @Autowired
//    CustomerDA customerDA;

    @Autowired
    UserDA userDA;

    @Bean
    AuthProvider authProvider() {
        System.out.println("==========> ApplicationCongfig - authProvider()" );
        AuthProvider authProvider = new AuthProvider(userDetailsService());
        return authProvider;
    }

    @Bean
    UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                System.out.println("==========> ApplicationCongfig - userDetailsService()" );

                UserDetails u = null;
                u = adminDA.findByEmail(username);
                if(u == null) {
//                    u = customerDA.findByEmail(username);
                }
                if(u == null) {
//                    u = sellerDA.findByEmail(username);
                }
                if(u == null) {
                    u = userDA.findUserByEmail(username);
                }
                return u;
            }
        };
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        System.out.println("==========> ApplicationCongfig - authenticationManager()" );
        return config.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        System.out.println("==========> ApplicationCongfig - passwordEncoder()" );
        return new BCryptPasswordEncoder();
    }
}
