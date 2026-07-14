package bloco_notas.demo;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    private final JwtEncoder jwtEncoder;

    public TokenService(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    public String gerarToken(Usuario usuario) {
        Instant agora = Instant.now();

        JwtClaimsSet dadosToken = JwtClaimsSet.builder()
            .issuer("bloco-notas")
            .issuedAt(agora)
            .expiresAt(agora.plus(2, ChronoUnit.HOURS))
            .subject(usuario.getId().toString())
            .claim("nome", usuario.getNome())
            .claim("email", usuario.getEmail())
            .build();

        JwsHeader cabecalho = JwsHeader
            .with(MacAlgorithm.HS256)
            .build();

        JwtEncoderParameters parametros = JwtEncoderParameters.from(
            cabecalho,
            dadosToken
        );

        return jwtEncoder
            .encode(parametros)
            .getTokenValue();
    }
}