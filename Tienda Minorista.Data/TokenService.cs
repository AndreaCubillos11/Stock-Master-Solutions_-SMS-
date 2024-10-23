using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TiendaMinorista.Model;

public class TokenService
{
    // Método para generar el token
    public string GenerateJwtToken(int userId)
    {

        var tokenH = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
        var tokendes = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                    new Claim(ClaimTypes.Name ,userId.ToString())
            }),
            Expires = DateTime.Now.AddMinutes(480), // Tiempo de expiración
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenH.CreateToken(tokendes);
        return tokenH.WriteToken(token);

    }
}
