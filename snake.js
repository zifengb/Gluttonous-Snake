// JavaScript Document

/*
	采用40x40的表格做贪食蛇的移动背景
	bug1:开始后还要点击获取焦点才可操控蛇的方向(火狐)
*/
//全局变量
var sss=[];
var fd=[];
var timer=null;
var speed=500;
var direction=37;	//初始运动方向
var btn=true;		//控制蛇的反应开关
	
//蛇
function snake()
{
	var x=Math.ceil(Math.random()*40);
	var y=Math.ceil(Math.random()*40);
	if(x>1&&x<38&&y!=0)					//限制蛇的起始位置(主要是x轴)
		for(var i=0;i<3;i++)
		{
			sss[i]={c:x+i,l:y};
			document.getElementById("box-"+sss[i].c+"-"+sss[i].l).className='snake';
		}
	else
		snake();
	
	move();
};

//移动开始函数
function start()
{
	for(var j=sss.length-1;j>0;j--)
	{
		document.getElementById("box-"+sss[j].c+"-"+sss[j].l).className='';
		sss[j].c=sss[j-1].c;
		sss[j].l=sss[j-1].l;
	}
	
	switch(direction)
	{
		case 37:
			sss[0].c--;
			break;
		case 38:
			sss[0].l--;
			break;
		case 39:
			sss[0].c++;
			break;
		case 40:
			sss[0].l++;
			break;
	}
	
	//死亡1:接触到边界
	if(sss[0].c==0||sss[0].c==41||sss[0].l==0||sss[0].l==41){
		clearInterval(timer);
		alert('You are died!');
		restart.value='重启';
	}
	else
	{
		for(var i=0;i<sss.length;i++)
		{
			document.getElementById("box-"+sss[i].c+"-"+sss[i].l).className='snake';
		}
			
		document.onkeydown=function(e)
		{
			var ev=e||event;
			var code=ev.keyCode;
			//alert(code);
			if(code>40||code<37)
				return false;
			if(btn){
				//防止头部往反方向走触到身体
				switch(code)
				{
					case 37:
						if(direction!=39) direction=37; btn=false;
						break;
					case 38:
						if(direction!=40) direction=38; btn=false;
						break;
					case 39:
						if(direction!=37) direction=39; btn=false;
						break;
					case 40:
						if(direction!=38) direction=40; btn=false;
						break;
				}
			}
			
			setTimeout(function(){btn=true;},speed);
		};
			
		//死亡2:触碰身体
		for(var i=1;i<sss.length;i++)
		{
			if(sss[0].c==sss[i].c&&sss[0].l==sss[i].l){
				clearInterval(timer);
				alert('You are died!');
				restart.value='重启';
			}
		}
		
		//吃食物
		if(sss[0].c==fd[0].c&&sss[0].l==fd[0].l)
		{
			sss.splice(sss.length-1,0,fd[0]);		//增加蛇的长度，增添到尾部
			fd.shift();								//清空食物数组	
		}
		
		if(fd.length==0)
			food();
	}
};

//移动
function move()
{
	clearInterval(timer);
	timer=setInterval(start,speed);
	
	restart.onclick=function()
	{
		switch(this.value)
		{
			case '重启':
				window.open("snake.html","_self");
				this.value='暂停';
				break;
			case '暂停':
				clearInterval(timer);
				this.value='继续';
				break;
			case '继续':
				timer=setInterval(start,speed);
				this.value='暂停';
				break;
		}
	}
};

//食物
function food()
{
	var x=Math.ceil(Math.random()*40);
	var y=Math.ceil(Math.random()*40);
	if((x>0&&x<41)&&(y>0&&y<41))
	{
		for(var i=0;i<sss.length;i++)
		{
			if(x!=sss[i].c&&y!=sss[i].l)
				fd[0]={c:x,l:y};
		}
		document.getElementById("box-"+fd[0].c+"-"+fd[0].l).className='food';
	}
	else
		food();
};

window.onload=function()
{
	var Ocontainer=document.getElementsByClassName('container')[0];
	var tal=Ocontainer.getElementsByTagName('div')[0];
	var layout=[];
	layout.push('<table>');
	for(var i=1;i<=40;i++)
	{
		layout.push('<tr>');
		for(var j=1;j<=40;j++)
		{
			layout.push('<td id="box-'+j+"-"+i+'"></td>');
		}
		layout.push('</tr>');
	}
	layout.push('</table>');
	tal.innerHTML=layout.join('');		//数组join方法：连成字符串返回
	
	//游戏启动步骤
	var aInput=document.getElementsByTagName('input');
	var start=document.getElementById('start');
	var restart=document.getElementById('restart');
	var aSpeed=document.getElementsByClassName('speed');
	
	start.disabled=true;
	
	start.onclick=function()
	{
		start.disabled=true;
		snake();
		food();
	};
	
	
	for(var i=0;i<aSpeed.length;i++)
	{
		aSpeed[i].index=i;
		aSpeed[i].onclick=function()
		{
			switch(this.index)
			{
				case 0:
					speed=500;
					break;
				case 1:
					speed=300;
					break;
				case 2:
					speed=100;
					break;	
			}
			
			for(var j=0;j<aSpeed.length;j++)
			{
				aSpeed[j].disabled=true;
			}
			
			start.disabled=false;
		}
	}
	
};