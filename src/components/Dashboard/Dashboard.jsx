import React,{useState, useEffect}  from 'react';
import EmployeeService from '../../service/EmployeeService';
import {  Card,  Statistic  } from "antd";


function Dashboard() {

    const [totalActive, settotalActive] = useState("");
    const [totalInactive, settotalInactive] = useState("");


    const getTotalNumberOfActive = ()=> {
        EmployeeService.getAllEmployeeByActiveStatus(1).then((res)=>{
            console.log(res.data);
            settotalActive(res.data.totalNumber);
        }).catch(error=>{
            console.log(error);
        })
    }

    const getTotalNumberOfInactive = ()=> {
        EmployeeService.getAllEmployeeByActiveStatus(0).then((res)=>{
            console.log(res.data);
            settotalInactive(res.data.totalNumber);
        }).catch(error=>{
            console.log(error);
        })
    }



    useEffect(() => {
        getTotalNumberOfActive();
        getTotalNumberOfInactive();
    }, []);


  return (
    <div className='flex flex-col w-full ml-8 mr-48 mt-8'>
      <div className='flex flex-row gap-12'>
            <div className='basis-1/2'>
                <Card  bordered={true} className="w-132">
                    <Statistic
                    title="The total of existing employee in 2023 (Active)"
                    value={totalActive}
                    precision={0}
                    valueStyle={{
                    color: '#36AE7C',
                    }} />
                </Card>
            </div>
            <div className='basis-1/2'>
                <Card  bordered={true}>
                    <Statistic
                    title="The total of existing employee in 2023"
                    value={totalInactive}
                    precision={0}
                    valueStyle={{
                    color: '#FE0000',
                    }} />
                </Card>
            </div>
      </div>
      <div className='flex flex-col w-full mt-12  mr-48'>
            <Card bordered={true}>
                    <div className='flex flex-row justify-center py-8'>
                        <span className='uppercase font-kdam '>The latest Company News of 2023</span>
                    </div>
                    <div className='flex flex-row justify-center text-gray-500'>
                        <span className='first-letter'>Announcements and Notices - 12/2023</span>
                     </div>
                    <p className='px-12 pt-4'>
                    There were only two ways to get out of this mess if they all worked together. The problem was that neither was all that appealing. One would likely cause everyone a huge amount of physical pain while the other would likely end up with everyone in jail. In Sam's mind, there was only one thing to do. He threw everyone else under the bus and he secretly sprinted away leaving the others to take the fall without him.
                    Life isn't always beautiful. That was a lesson that Dan was learning. He also realized that life wasn't easy. This had come as a shock since he had lived a charmed life. He hated that this was the truth and he struggled to be happy knowing that his assumptions weren't correct. He wouldn't realize until much later in life that the difficult obstacles he was facing that were taking away the beauty in his life at this moment would ultimately make his life much more beautiful. All he knew was that at this moment was that life isn't always beautiful.
                      </p>
                      <br />
                      <p className='px-12'>
                      The thing that's great about this job is the time sourcing the items involves no traveling. I just look online to buy it. It's really as simple as that. While everyone else is searching for what they can sell, I sit in front of my computer and buy better stuff for less money and spend a fraction of the time doing it.
                        His parents continued to question him. He didn't know what to say to them since they refused to believe the truth. He explained again and again, and they dismissed his explanation as a figment of his imagination. There was no way that grandpa, who had been dead for five years, could have told him where the treasure had been hidden. Of course, it didn't help that grandpa was roaring with laughter in the chair next to him as he tried to explain once again how he'd found it.
                        He collected the plastic trash on a daily basis. It never seemed to end. Even if he cleaned the entire beach, more plastic would cover it the next day after the tide had come in. Although it was a futile effort that would never be done, he continued to pick up the trash each day.
                    </p>

                    <div className='flex flex-row justify-center text-gray-500 mt-8'>
                        <span className='first-letter'>Announcements and Notices - 11/2023</span>
                    </div>
                        <p className='px-12 pt-4'>
                        There were only two ways to get out of this mess if they all worked together. The problem was that neither was all that appealing. One would likely cause everyone a huge amount of physical pain while the other would likely end up with everyone in jail. In Sam's mind, there was only one thing to do. He threw everyone else under the bus and he secretly sprinted away leaving the others to take the fall without him.
                        Life isn't always beautiful. That was a lesson that Dan was learning. He also realized that life wasn't easy. This had come as a shock since he had lived a charmed life. He hated that this was the truth and he struggled to be happy knowing that his assumptions weren't correct. He wouldn't realize until much later in life that the difficult obstacles he was facing that were taking away the beauty in his life at this moment would ultimately make his life much more beautiful. All he knew was that at this moment was that life isn't always beautiful.
                        </p>
                        <br />
                        <p className='px-12'>
                        The thing that's great about this job is the time sourcing the items involves no traveling. I just look online to buy it. It's really as simple as that. While everyone else is searching for what they can sell, I sit in front of my computer and buy better stuff for less money and spend a fraction of the time doing it.
                            His parents continued to question him. He didn't know what to say to them since they refused to believe the truth. He explained again and again, and they dismissed his explanation as a figment of his imagination. There was no way that grandpa, who had been dead for five years, could have told him where the treasure had been hidden. Of course, it didn't help that grandpa was roaring with laughter in the chair next to him as he tried to explain once again how he'd found it.
                            He collected the plastic trash on a daily basis. It never seemed to end. Even if he cleaned the entire beach, more plastic would cover it the next day after the tide had come in. Although it was a futile effort that would never be done, he continued to pick up the trash each day.
                        </p>

                        <div className='flex flex-row justify-center text-gray-500 mt-8'>
                        <span className='first-letter'>Announcements and Notices - 10/2023</span>
                    </div>
                        <p className='px-12 pt-4'>
                        There were only two ways to get out of this mess if they all worked together. The problem was that neither was all that appealing. One would likely cause everyone a huge amount of physical pain while the other would likely end up with everyone in jail. In Sam's mind, there was only one thing to do. He threw everyone else under the bus and he secretly sprinted away leaving the others to take the fall without him.
                        Life isn't always beautiful. That was a lesson that Dan was learning. He also realized that life wasn't easy. This had come as a shock since he had lived a charmed life. He hated that this was the truth and he struggled to be happy knowing that his assumptions weren't correct. He wouldn't realize until much later in life that the difficult obstacles he was facing that were taking away the beauty in his life at this moment would ultimately make his life much more beautiful. All he knew was that at this moment was that life isn't always beautiful.
                        </p>
                        <br />
                        <p className='px-12'>
                        The thing that's great about this job is the time sourcing the items involves no traveling. I just look online to buy it. It's really as simple as that. While everyone else is searching for what they can sell, I sit in front of my computer and buy better stuff for less money and spend a fraction of the time doing it.
                            His parents continued to question him. He didn't know what to say to them since they refused to believe the truth. He explained again and again, and they dismissed his explanation as a figment of his imagination. There was no way that grandpa, who had been dead for five years, could have told him where the treasure had been hidden. Of course, it didn't help that grandpa was roaring with laughter in the chair next to him as he tried to explain once again how he'd found it.
                            He collected the plastic trash on a daily basis. It never seemed to end. Even if he cleaned the entire beach, more plastic would cover it the next day after the tide had come in. Although it was a futile effort that would never be done, he continued to pick up the trash each day.
                        </p>
            </Card>
      </div>
    </div>
  )
}

export default Dashboard;
