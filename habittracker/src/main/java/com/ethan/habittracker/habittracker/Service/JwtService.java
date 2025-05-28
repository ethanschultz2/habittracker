package com.ethan.habittracker.habittracker.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.ethan.habittracker.habittracker.Entities.User;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secretKey;

    @Value("${app.jwt.expiration}")
    private long expirationTime;

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, expirationTime);
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        // Cast to User to access email
        User user = (User) userDetails;
        System.out.println("Building JWT token for email: " + user.getEmail());
        
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(user.getEmail()) // Use EMAIL instead of username
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract username from JWT token (actually extracts email now)
    public String extractUsername(String token) {
        String email = extractAllClaims(token).getSubject();
        System.out.println("Extracted email from token: " + email);
        return email;
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Validate JWT token
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // Validate if JWT token is correct
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String emailFromToken = extractUsername(token); // This is actually email
        User user = (User) userDetails;
        boolean isValid = (emailFromToken.equals(user.getEmail()) && !isTokenExpired(token));
        System.out.println("Token validation - Email from token: " + emailFromToken + 
                          ", User email: " + user.getEmail() + ", Valid: " + isValid);
        return isValid;
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public long getExpirationTime() {
        return expirationTime;
    }
}