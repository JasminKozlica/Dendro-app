package com.dendroapp.DTO;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

public class UpdateProfileRequest {
    @Getter
    @Setter
    @Size(min = 2, message = "Name must have at least 2 letters long")
    private String firstName;
    @Getter
    @Setter
    @Size(min = 2 , message = "Lastname must heve at least 2 letter long")
    private String lastname;
    @Getter
    @Setter
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @Getter
    @Setter
    @Size(min = 2, message = "Username must be at least 2 letters long")
    private String username;

}
