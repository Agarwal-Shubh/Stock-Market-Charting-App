package com.shubh.userservice.application.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SigninResponse
{
	private String username;
	private String token;
	private boolean admin;
	private long expiresIn;
}
