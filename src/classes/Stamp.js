export function getStamp(){
        
    let stamp = "";
    let hour = new Date().getHours();
    if (hour > 17) {
      stamp = "night";
    } else {
      stamp = "day";
    }

    return stamp;
    }