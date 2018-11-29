using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace fantastic4collab2.Controllers
{
    public class HomeController : Controller
    {
        static HomeController()
        {
            
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}