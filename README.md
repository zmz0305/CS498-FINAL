# CS498-FINAL

Rest API specification
----


The API for restful requests:

### /user/:id

__method__: GET
__response__:
```javascript
{
	"status": "error" or "success"
	"data": {
		"email" : email,
		"name" : name,
		"repo_ids" : [repo_id]
	}
	"error": error_message
}
```

### user/:id

__method__: POST
__data__:
```javascript
{
	"action": "add_repo",
	"data" : {
		url: repo_url,
		name : repo_name
	}
}
```
Add the repo to database and also update user repo_id
or 
```javascript
{
	"action": "delete_repo",
	"data": repo_id
}
```
or (in the future not sure if we need it anytime soon)
```javascript
{
	"action": "update_repo",
	"data": {
		id : repo_id,
		url: repo_url,
		name : repo_name
	}
}
```

__response__:
```javascript
{
	"status": "error" or "success"
	"data": {
		"email" : email,
		"name" : name,
		"repo_ids" : [repo_id]
	}
	"error": error_message
}
```


###  /repositories/:id


__method__: GET
get the data of the repository
__response__:
```javascript
{
	"status": "error" or "success"
	"data": {
			"id": id,
			"name": repo_name,
			"url" : repo_url,
			"contents": [content_id]
			}
	"error": error_message
}
```

### /repositories/:id

__method__:POST

__method__: POST
__data__:
```javascript
{
	"action": "add_content",
	"data" : {
		url: content_url,
		name: content_name,
		position : position
	}
}
```
Add the repo to database and also update repo
or 
```javascript
{
	"action": "delete_content",
	"data": content_id
}
```
or (in the future not sure if we need it anytime soon)
```javascript
{
	"action": "update_content",
	"data": {
		id : content_id,
		url: content_url,
		name : content_name,
		position : content_position
	}
}
```

__response__:
```javascript
{
	"status": "error" or "success"
	"data": {
		"id": id,
		"name": repo_name,
		"url" : repo_url,
		"contents": [content_id]
	}
	"error": error_message
}
```

###/content/:id
__method__: GET
__response__:
```javascript
{
	id : content_id,
	url: content_url,
	name : content_name,
	position : content_position
}
```

### /html/
__method__: GET
__data__:
```javascript
{
	url : url we want to get 
}
// url example: http://www.google.com
```

__response__:
```javascript
{
	"status": "error" or "success"
	"data": html or css or soemthingelse
	"error": error_message
}
```
__n.b. the javascript and css resources might also want to be processed so that the final html is enough to looks like a real one. Google search cached page might be a good example (styles and scripts are preloaded)__

