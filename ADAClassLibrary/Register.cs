using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ADAClassLibrary
{
    public class LoginCredential 
    {
    public string Username { get; set; }
    public string Password { get; set; }

    }
    public class Register
    {
        public int UserId { get; set; }
        public string Honorifics { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Nationality { get; set; }
        public DateTime Birthdate { get; set; }
        public string Documents { get; set; }
        public List<string> DocumentType { get; set; }
        public string Mobile { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool Active { get; set; }
        public bool IsDelmaIsland { get; set; }                                                                                        
        public bool IsUAEId { get; set; }
        public List<string> FileName { get; set; }
        public bool GovEntity { get; set; }
        public List<RegisterGroup> Groups { get; set; }
        public List<RegisterCorporate> registerCorporate { get; set; }
    }

    public class RegisterGroup
    {
        public int Id { get; set; }
        public string Honorifics { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Nationality { get; set; }
        public DateTime Birthdate { get; set; }
        public string Documents { get; set; }
        public List<string> DocumentType { get; set; }
        public string Mobile { get; set; }
        public bool IsDelmaIsland { get; set; }
        public bool IsUAEId { get; set; }
        public List<string> FileName { get; set; }
    }


    public class RegisterCorporate
    {
        public int Id { get; set; }
        public string Honorifics { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Nationality { get; set; }
        public DateTime Birthdate { get; set; }
        public string Documents { get; set; }
        public List<string> DocumentType { get; set; }
        public List<string> FileName { get; set; }
        public string Mobile { get; set; }
        public bool IsDelmaIsland { get; set; }
        public bool IsUAEId { get; set; }
        public bool GovEntity { get; set; }

    }
}
