using System.ComponentModel.DataAnnotations;
using System;

namespace DatingApp.API.Dtos
{
    public class UsersDto
    {        
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="You must specify the password between 4 to 8 character")]
        public string Password { get; set; }
        
        [Required]
        public string Gender { get; set; }
        
        [Required]
        public string KnownAs { get; set; }
        
        [Required]
        public string City { get; set; }
        
        [Required]
        public string Country { get; set; }
        
        [Required]
        public DateTime DateOfBirth { get; set; }
                
        public DateTime Created { get; set; }
                
        public DateTime LastActive { get; set; }


        public UsersDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}