package bloco_notas.demo;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(
    origins = "${FRONTEND_URL:http://localhost:5173}"
)
@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String, String> verificar() {
        return Map.of(
            "status",
            "online"
        );
    }
}