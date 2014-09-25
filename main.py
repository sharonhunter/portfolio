#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
from google.appengine.api import mail


# Creates a Handler that will handle the / URL
class IndexHandler(webapp2.RequestHandler):
   def get(self):
        self.redirect("/static/html/index.html", True)


class ContactFormHandler(webapp2.RequestHandler):
   def post(self):
        name = self.request.get("name")
        email = self.request.get("email")
        subject = self.request.get("subject")
        message = self.request.get("message") 
        body="Contact Form Submission from: " + email + "\n\n" + message
        mail.send_mail(sender="barkandbridle@gmail.com",
              to="Sharon Hunter <sharonhunter@runbox.com>",
              subject=subject,
              body=body)       
       
app = webapp2.WSGIApplication([
    ('/', IndexHandler),
    ('/contactform', ContactFormHandler)
], debug=True)
