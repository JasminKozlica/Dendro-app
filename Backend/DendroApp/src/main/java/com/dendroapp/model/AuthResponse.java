package com.dendroapp.model;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
}
