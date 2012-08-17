


CountDownCubes = function() { 


	THREE.Object3D.call( this );

	//this.targetDate = new Date(Date.UTC(2011,11,25,5,0,0));
	//this.targetDate = new Date(new Date().getTime() - 5000);
	this.finished = false;


	//var cubeDays10 = this.cubeDays10 = new CountDownCube(3),
	//cubeDays1 = this.cubeDays1 = new CountDownCube(),
	var cubeHours10 = this.cubeHours10 = new CountDownCube(3),
	cubeHours1 = this.cubeHours1 = new CountDownCube(),
	cubeMins10 = this.cubeMins10 = new CountDownCube(6), 
	cubeMins1 = this.cubeMins1 = new CountDownCube(), 
	cubeSecs10 = this.cubeSecs10 = new CountDownCube(6), 
	cubeSecs1 = this.cubeSecs1 = new CountDownCube(); 
	 
	this.allCubes = new Array();
	//this.allCubes.push(cubeDays10, cubeDays1, cubeHours10, cubeHours1, cubeMins10, cubeMins1, cubeSecs10, cubeSecs1);
	this.allCubes.push(cubeHours10, cubeHours1, cubeMins10, cubeMins1, cubeSecs10, cubeSecs1);
	
	//this.add(cubeDays10); 
	//this.add(cubeDays1); 
	this.add(cubeHours10); 
	this.add(cubeHours1); 
	this.add(cubeMins10); 
	this.add(cubeMins1); 
	this.add(cubeSecs10); 
	this.add(cubeSecs1); 
	
	var cubewidth = 40, numberGap = 10; 

	// cubeDays10.position.x -= ((cubewidth*3.5) + numberGap*2); 
	// cubeDays1.position.x -= ((cubewidth*2.5) + numberGap*2); 
	// 
	// cubeHours10.position.x -= ((cubewidth*1.5) + numberGap); 
	// cubeHours1.position.x -= ((cubewidth*0.5) + numberGap); 
	// cubeMins10.position.x += (cubewidth*1.5); 
	// cubeMins1.position.x += (cubewidth*2.5);
	// cubeSecs10.position.x += ((cubewidth*3.5) + numberGap); 
	// cubeSecs1.position.x += ((cubewidth*4.5) + numberGap); 	

	
	
	for(var i=0; i<this.allCubes.length;i++) {
		var cube = this.allCubes[i];
		cube.position.x = i*cubewidth - ((this.allCubes.length-1)*cubewidth/2); 
		if(i%2==1) cube.position.x -=5; 
		setInterval(function(e){e.grow=true;}, i*80, cube); 	
		
	}
	
	
	
};

CountDownCubes.prototype = new THREE.Object3D();
CountDownCubes.prototype.constructor = CountDownCubes;
CountDownCubes.prototype.startTicking = function() {
	this.intervalID =  setInterval(function(e){e.updateCountDown.call(e);}, 1000, this); 	
};
CountDownCubes.prototype.updateCountDown = function() {
	
	dateNow = new Date();	//grab current date
	
	if(this.targetDate) {
		if(!this.finished) {
			//amount = this.targetDate.getTime() - (dateNow.getTime() - (dateNow.getTimezoneOffset() * 60000));
			amount = this.targetDate.getTime() - (dateNow.getTime());
			if(amount<0) {
				amount = 0; 
		
				for(var i=0; i<this.allCubes.length;i++) {
					var cube = this.allCubes[i];
					setInterval(function(e){e.targetScale=0;}, i*80, cube); 	
					
				}
			
				countdownFinished();
				this.finished = true;
			}
		}
	} else {
		
		amount = dateNow.getTime() - (dateNow.getTimezoneOffset() * 60000);	//calc milliseconds between dates
		delete dateNow;
	}
	
	var days=0,hours=0,mins=0,secs=0;

	amount = Math.floor(amount/1000);//kill the "milliseconds" so just secs

	days=Math.floor(amount/86400);//days
	amount=amount%86400;

	hours=(Math.floor(amount/3600));//hours
	amount=amount%3600;

	mins=Math.floor(amount/60);//minutes
	amount=amount%60;

	secs=Math.floor(amount);//seconds
	

	
	if(secs<10) {
		this.cubeSecs10.setNum(0); 
		this.cubeSecs1.setNum(secs); 
	} else {
		secs = secs.toString();
		this.cubeSecs10.setNum(secs.charAt(0));
		this.cubeSecs1.setNum(secs.charAt(1)); 
	}
	
	if(mins<10) {
		this.cubeMins10.setNum(0); 
		this.cubeMins1.setNum(mins); 
	} else {
		mins = mins.toString();
		this.cubeMins10.setNum(mins.charAt(0));
		this.cubeMins1.setNum(mins.charAt(1)); 
	}
	
	if(hours<10) {
		this.cubeHours10.setNum(0); 
		this.cubeHours1.setNum(hours); 
	} else {
		hours = hours.toString();
		this.cubeHours10.setNum(hours.charAt(0));
		this.cubeHours1.setNum(hours.charAt(1)); 
	}	
	// 
	// if(days<10) { 
	// 	this.cubeDays10.setNum(0); 
	// 	this.cubeDays1.setNum(days);
	// 	
	// } else {
	// 	days = days.toString();
	// 	this.cubeDays10.setNum(days.charAt(0));
	// 	this.cubeDays1.setNum(days.charAt(1)); 
	// }

};
CountDownCubes.prototype.updateSpin = function() { 
	
	
	for(var i=0; i<	this.allCubes.length; i++) { 
		this.allCubes[i].updateSpin(); 
		
	}
	
	
};



CountDownCube = function (numSides) {
	
	if(!numSides) numSides = 10; 
	
	var lineColour = 0x524a55,
		lineOpacity = 0.4,
		lineWidth = 2;
		
	this.targetRotX = 0; 
	this.currentRotX = 0; 
	this.rotVel = 0; 
	this.currentNum = 0; 
	this.numSides = numSides;
	
	this.targetScale = 1; 
	
	THREE.Object3D.call( this );
	
	var material = new THREE.MeshBasicMaterial( { color: lineColour, wireframe:true, wireframeLinewidth:lineWidth, opacity:lineOpacity, blending :THREE.AdditiveBlending, depthTest:false,transparent:true} ) ;
	
	var cubegeom = new THREE.CubeGeometry(25, 30, 30, 1, 1, 1);
	
	var cube = this.cube = new THREE.Mesh(cubegeom, material );
	cube.doubleSided = true;
	this.add( cube );
	
	var material = new THREE.MeshBasicMaterial( { color: lineColour, wireframe:true, wireframeLinewidth:lineWidth*3, opacity:lineOpacity*0.5, blending :THREE.AdditiveBlending, depthTest:false,transparent:true} ) ;
	
	var cube = this.cube = new THREE.Mesh(cubegeom, material );
	cube.doubleSided = true;
	this.add( cube );
	
	var material = new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture(creativeJSImageFolder+'numbers.png'), blending :THREE.AdditiveBlending, depthTest:false,transparent:true});

	this.numbers = new Array(); 
	
	for(var i=-1; i<numSides+1; i++) { 
		
		
		
		var planeContainer = new THREE.Object3D(); 
		var planeGeom = new THREE.PlaneGeometry(30,30,1,1); 
		var plane = new THREE.Mesh(planeGeom, material); 
		plane.position.z = 15; 
		planeContainer.add(plane); 
		planeContainer.rotation.x = i*-Math.PI/2;
		
		this.add(planeContainer); 
		
		var uvs = planeGeom.faceVertexUvs[0][0]; 
 		for(var j=0; j<uvs.length; j++) {
 			var uv = uvs[j]; 
			uvs[j].u = (((i<0)?i+numSides:(i%numSides))*0.1)+(uvs[j].u*0.1); 
		
 		}
		this.numbers.push(plane); 
			
	}
	
	this.scale.set(0.01,0.01,0.01); 
};

CountDownCube.prototype = new THREE.Object3D();
CountDownCube.prototype.constructor = CountDownCube;
CountDownCube.prototype.updateSpin = function() {
	
	this.rotVel*=0.65; 
	
	this.rotVel += (this.targetRotX-this.currentRotX)*0.2;
	this.currentRotX+=this.rotVel; 
	
	this.rotation.x = this.currentRotX; 
	
	for(var i=0; i<this.numbers.length;i++){
		var plane = this.numbers[i]; 
		var rot = (plane.parent.rotation.x + this.currentRotX) ; 
	
	//	if(i==0) console.log(plane.parent.rotation.x , this.currentRotX);
	//	if((i==0))rot=0;//(Math.PI*5);
		if((rot<2) && (rot>-2)) 
			plane.visible = true; 
		else
			plane.visible = false;
		
	}
	
	if(this.scale.x!=this.targetScale) {
		var diff = (this.targetScale-this.scale.x) * 0.2; 
		if(Math.abs(diff)<0.001) 	
			this.scale.set(this.targetScale,this.targetScale,this.targetScale);
		else 
			this.scale.addSelf(new THREE.Vector3(diff,diff,diff)); 
		//if(this.scale.x<0) this.scale.set(0,0,0); 
		
	}

};

CountDownCube.prototype.setNum = function (num) { 
	//console.log(num); 
	this.targetRotX = num*Math.PI/2; 
	
	// for a clock counting down change this : 
	 if(this.currentNum>num)
	 		this.currentRotX -= ((Math.PI/2)*this.numSides); 
	//if(this.currentNum<num)
	//	this.currentRotX += ((Math.PI/2)*this.numSides); 
	

	this.currentNum = num; 
	
};

