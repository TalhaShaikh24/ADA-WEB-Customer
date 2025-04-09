using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ADAClassLibrary
{
   public class Users
    {
            public int? Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string ContactNo { get; set; }
            public string LoginID { get; set; }
            public string Password { get; set; }
    
            public bool Active { get; set; }
    
            public int CreatedBy { get; set; }
            public DateTime? ModifiedOn { get; set; }
            public string Gender { get; set; }
      
            public List<int> RoleId { get; set; }

    }

    public class UsersPOCO : Users
    {
        public string RoleIdText { get; set; }
    }
}
