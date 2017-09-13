Code DJ is shared by Tralalere and its partners under the licence CC BY-NC-ND
https://creativecommons.org/licenses/by-nc-nd/2.0/

Install avec liens symboliques :
ln -s /Users/plancien/dev/toxicode/pedagogie/silent_teacher/scripts/modules/javascript.js scripts/javascript_module.js
ln -s /Users/plancien/dev/toxicode/pedagogie/silent_teacher/scripts/core/ scripts/silent_teacher_core


deploy : aws s3 sync . s3://code-dj --exclude ".git/*"


http://code-dj.s3-website-eu-west-1.amazonaws.com/index.html
