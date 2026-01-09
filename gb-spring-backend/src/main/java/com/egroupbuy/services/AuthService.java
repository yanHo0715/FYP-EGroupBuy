package com.egroupbuy.services;

import com.egroupbuy.dao.AdminDA;
import com.egroupbuy.dao.UserDA;
import com.egroupbuy.dto.AuthRequest;
import com.egroupbuy.dto.AuthResponse;
import com.egroupbuy.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtService jwtService;

    @Autowired
    AdminDA adminDA;

//    @Autowired
//    CustomerDA customerDA;

    @Autowired
    UserDA userDA;


    public AuthResponse userLogin(AuthRequest a) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(a.getEmail(), a.getPassword()));
        } catch (Exception e) {
            System.out.println(e);
            System.out.println("User ID [" + a.getEmail() + "] login failed");
            return AuthResponse.builder().status("fail").build();
        }

        var user = userDA.findUserByEmail(a.getEmail());

        if (user != null) {
            user.setPassword(null);
            var token = jwtService.generateToken(user);
            System.out.println("User ID [" + user.getEmail() + "] login successful");
            return AuthResponse.builder().status("success").token(token).user(user).build();
        } else {
            System.out.println("User ID [" + a.getEmail() + "] login failed");
            return AuthResponse.builder().status("fail").build();
        }

    }

    public AuthResponse adminLogin(AuthRequest a) {

        System.out.println("AuthResponse adminLogin - Admin ID [" + a.getEmail() + "] === Begin ===");

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(a.getEmail(), a.getPassword()));

        var adm = adminDA.findByEmail(a.getEmail());
        var token = jwtService.generateToken(adm);
        adm.setPassword(null);

        System.out.println("AuthResponse adminLogin - Admin ID [" + a.getEmail() + "] === end ===");

        return AuthResponse.builder().status("success").token(token).user(adm).build();
    }

/*
    public AuthResponse customerLogin(AuthRequest a) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(a.getEmail(), a.getPassword()));
        var user = customerDA.findByEmail(a.getEmail());
        var token = jwtService.generateToken(user);
        user.setPassword(null);
        return AuthResponse.builder().status("success").token(token).user(user).build();
    }

    public AuthResponse sellerLogin(AuthRequest a) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(a.getEmail(), a.getPassword()));
        var user = sellerDA.findByEmail(a.getEmail());
        var token = jwtService.generateToken(user);
        user.setPassword(null);
        return AuthResponse.builder().status("success").token(token).user(user).build();
    }*/
}
