
export function hideAll(){
    document.querySelectorAll('.view-section').forEach(v => v.style.display = 'none')
 }
 
  
 export function showView(section) { 
     hideAll()
     section.style.display = 'block';
 }
 