package com.example.carrentelsystembackend.security.dto;

public class AccountResponseDTO {
    private String message;
    private String token;

    public AccountResponseDTO(String message, String token) {
        this.message = message;
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    // Builder Pattern pour faciliter la création des instances
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String message;
        private String token;

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public AccountResponseDTO build() {
            return new AccountResponseDTO(message, token);
        }
    }
}
