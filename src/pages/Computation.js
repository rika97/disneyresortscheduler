
import axios from "axios";

export function getAllData () {

  // API test
  let waitList = [];
  let promises = [];

  const attractionIdList = ["958", "922", "952", "949", "964", "961", "916", "973", "970", "925", "913", "994",
                            "910", "940", "937", "943", "997", "995", "998", "991", "967", "976", "934", "919", "982",
                          "979", "946", "928"];

  const dateId = "2022-08-30";
  
  for (let i=0; i < attractionIdList.length; i++) {
        promises.push(
            axios.get(`http://localhost:5000/${attractionIdList[i]}/${dateId}`)
            .then((response) => {
                waitList.push([i, response.data])
                })
        );
        };
        
    Promise.all(promises).then(() => {
        const sortedWaitList = waitList.sort((a, b) => a[0] - b[0])
        let cleanWaitList = []
        for (let i=0; i < sortedWaitList.length; i++) {
            cleanWaitList.push(sortedWaitList[i][1])
        };
        console.log(cleanWaitList)
    });

}