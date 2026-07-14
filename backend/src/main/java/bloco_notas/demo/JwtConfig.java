package bloco_notas.demo;

import java.util.Base64;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

@Configuration
public class JwtConfig {

    private final SecretKey secretKey;

    public JwtConfig(@Value("${jwt.secret}") String jwtSecret) {
        byte[] chaveDecodificada = Base64
            .getDecoder()
            .decode(jwtSecret);

        this.secretKey = new SecretKeySpec(
            chaveDecodificada,
            "HmacSHA256"
        );
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        return NimbusJwtEncoder
            .withSecretKey(secretKey)
            .build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder
            .withSecretKey(secretKey)
            .build();
    }
}