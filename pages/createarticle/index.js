function getE(selecter){
    return document.querySelector(selecter);
}
const converter = new showdown.Converter()
getE('.create-textarea').addEventListener('input',()=>{
    getE('.create-view').innerHTML=converter.makeHtml(getE('.create-textarea').innerText)
})
const upbut=document.querySelector('.upload-but')
upbut.addEventListener('mousedown',(e)=>{
    e.preventDefault();
  })
const upid=upbut.addEventListener('click',function upload(){
    const body=getE('.create-view').innerHTML;
    const title=getE('.title').value;
    const intro=getE('.intro').value;
    fetch('http://localhost/upload',{
        method:'POST',headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body:`body=${body}&title=${title}&intro=${intro}`})
        .then(()=>{
            upbut.innerHTML='上传成功';
            upbut.classList.add('success');
            upbut.removeEventListener('click',upload);
            },()=>
            {
            upbut.innerHTML='上传失败';
            upbut.classList.add('err');
        })
    })

