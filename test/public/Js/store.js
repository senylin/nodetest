/**
 * Created by senyi on 2015/4/14.
 */

//模拟数据
var data = [
    {'src':'1.jpg','title':'此处应为标题','date':'2015-04-12 09:53:03.0','label':'《标签》 《标签》 《标签》','covaerage':' &nbsp&nbsp&nbsp&nbsp 请在这里输入简要内容请在这里输入简要内容请在这里输入简要在这里输入简要内容请在这里输入简要内容请入简要在这里输入简要内容请在这里输入简要内容请入简...','typee':'techology','good':9,'link':''},
    {'src':'2.jpg','title':'此处应为标题1','date':'2015-04-12 09:53:03.0','label':'《标签》 《标签》 《标签》','covaerage':'&nbsp&nbsp&nbsp&nbsp请在这里输入简要内容请在这里输入简要内容请在这里输入简要在这里输入简要内容请在这里输入简要内容请入简...','typee':'techology','good':15,'link':''},
    {'src':'3.jpg','title':'此处应为标题2','date':'2015-04-12 09:53:03.0','label':'《标签》 《标签》 《标签》','covaerage':'  &nbsp&nbsp&nbsp&nbsp 请在这里输入简要内容请在这里输入简要内容请在这里输入简要在这里输入简要内容请在这里输入简要内容请入简...','typee':'techology','good':7,'link':''},
    {'src':'4.jpg','title':'此处应为标题3','date':'2015-04-12 09:53:03.0','label':'《标签》 《标签》 《标签》','covaerage':'  &nbsp&nbsp&nbsp&nbsp 请在这里输入简要内容请在这里输入简要内容请在这里输入简要在这里输入简要内容请在这里输入简要内容请入简...','typee':'techology','good':4,'link':''},
    {'src':'5.jpeg','title':'此处应为标题4','date':'2015-04-12 09:53:03.0','label':'《标签》 《标签》 《标签》','covaerage':' &nbsp&nbsp&nbsp&nbsp  请在这里输入简要内容请在这里输入简要内容请在这里输入简要在这里输入简要内容请在这里输入简要内容请入简...','typee':'techology','good':13,'link':''},
    {'src':'2.jpg','title':'此处应为标题5','date':'2015-04-12 09:53:03.0','label':'《标签》 《标签》 《标签》','covaerage':'  &nbsp&nbsp&nbsp&nbsp 请在这里输入简要内容请在这里输入简要内容请在这里输入简要在这里输入简要内容请在这里输入简要内容请入简...','typee':'dailynews','good':110,'link':''},
    {'src':'3.jpg','title':'此处应为标题6','date':'2015-04-12 09:53:03.0','label':'《标签》 《标签》 《标签》','covaerage':'  &nbsp&nbsp&nbsp&nbsp 请在这里输入简要内容请在这里输入简要内容请在这里输入简要在这里输入简要内容请在这里输入简要内容请入简...','typee':'techology','good':109,'link':''},
    {'src':'3.jpg','title':'此处应为标题6','date':'2015-04-12 09:53:03.0','label':'《标签》 《标签》 《标签》','covaerage':'  &nbsp&nbsp&nbsp&nbsp 请在这里输入简要内容请在这里输入简要内容请在这里输入简要在这里输入简要内容请在这里输入简要内容请入简...','typee':'dailynews','good':109,'link':''},
    {'src':'3.jpg','title':'此处应为标题6','date':'2015-04-12 09:53:03.0','label':'《标签》 《标签》 《标签》','covaerage':'  &nbsp&nbsp&nbsp&nbsp 请在这里输入简要内容请在这里输入简要内容请在这里输入简要在这里输入简要内容请在这里输入简要内容请入简...','typee':'techology','good':109,'link':''},
    {'src':'2.jpg','title':'此处应为标题5','date':'2015-04-12 09:53:03.0','label':'《标签》 《标签》 《标签》','covaerage':'  &nbsp&nbsp&nbsp&nbsp 请在这里输入简要内容请在这里输入简要内容请在这里输入简要在这里输入简要内容请在这里输入简要内容请入简...','typee':'dailynews','good':110,'link':''},
    {'src':'2.jpg','title':'此处应为标题5','date':'2015-04-12 09:53:03.0','label':'《标签》 《标签》 《标签》','covaerage':'  &nbsp&nbsp&nbsp&nbsp 请在这里输入简要内容请在这里输入简要内容请在这里输入简要在这里输入简要内容请在这里输入简要内容请入简...','typee':'dailynews','good':110,'link':''},
    {'src':'2.jpg','title':'此处应为标题5','date':'2015-04-12 09:53:03.0','label':'《标签》 《标签》 《标签》','covaerage':'  &nbsp&nbsp&nbsp&nbsp 请在这里输入简要内容请在这里输入简要内容请在这里输入简要在这里输入简要内容请在这里输入简要内容请入简...','typee':'dailynews','good':110,'link':''}
//    {'src':'4.jpg','title':'此处应为标题7'},
//    {'src':'5.jpeg','title':'此处应为标题8'},
//    {'src':'2.jpg','title':'此处应为标题9'},
//    {'src':'3.jpg','title':'此处应为标题0'},
//    {'src':'4.jpg','title':'此处应为标题11'},
//    {'src':'5.jpeg','title':'此处应为标题12'},
//    {'src':'2.jpg','title':'此处应为标题13'},
//    {'src':'3.jpg','title':'此处应为标题14'},
//    {'src':'4.jpg','title':'此处应为标题15'},
//    {'src':'5.jpeg','title':'此处应为标题16'},
//    {'src':'2.jpg','title':'此处应为标题17'},
//    {'src':'3.jpg','title':'此处应为标题18'},
//    {'src':'4.jpg','title':'此处应为标题19'},
//    {'src':'5.jpeg','title':'此处应为标题20'},
//    {'src':'2.jpg','title':'此处应为标题21'},
//    {'src':'3.jpg','title':'此处应为标题22'},
//    {'src':'4.jpg','title':'此处应为标题23'},
//    {'src':'5.jpeg','title':'此处应为标题24'},
//    {'src':'2.jpg','title':'此处应为标题25'},
//    {'src':'3.jpg','title':'此处应为标题26'},
//    {'src':'4.jpg','title':'此处应为标题'},
//    {'src':'5.jpeg','title':'此处应为标题'},
//    {'src':'2.jpg','title':'此处应为标题'},
//    {'src':'3.jpg','title':'此处应为标题'},
//    {'src':'4.jpg','title':'此处应为标题'},
//    {'src':'5.jpeg','title':'此处应为标题'},
//    {'src':'2.jpg','title':'此处应为标题'},
//    {'src':'3.jpg','title':'此处应为标题'},
//    {'src':'4.jpg','title':'此处应为标题'},
//    {'src':'5.jpeg','title':'此处应为标题'}

];