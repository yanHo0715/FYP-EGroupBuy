package com.egroupbuy.model;


import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

@SuppressWarnings("serial")
@Data
@NoArgsConstructor
public class User implements UserDetails {
    private int user_id;
    private String first_name;
    private String last_name;
    private String username;
    private String email;
    private String password;
    private String icon;
    private String status;
    private String address;
    private String city;
    private String country;
    private String post_code;
    private String phone;
    private double balance;
    private String holder_name;
    private String account_number;
    private String bank_name;
    private String branch_name;
    private Timestamp creation_date;
    private String user_alias;
    private double hold_fund;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
//        return username;
    }

    public String getUser_alias() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
