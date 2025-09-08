
package com.dendroapp.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class RegisterRequest {
    private String username;
    @NotBlank
    @Size(min = 6,message = "Password must be at least 6 characters long")
    private String password;
    private String firstname;
    private String lastname;

    public String getFirstname() {
        return firstname;
    }
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
}
