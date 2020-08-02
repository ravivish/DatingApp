using System;

namespace DatingApp.API.Dtos
{
    public class PhotosForDetailedDto
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public bool IsMain { get; set; }

        public DateTime DateAddedd { get; set; }

        public string Description { get; set; }
    }
}