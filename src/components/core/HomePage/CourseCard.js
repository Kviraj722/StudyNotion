import React from "react";

function CourseCard({ index, element, currentCard, setCurrentCard }) {
  return (
    <div>
      <div className="w-fit
      ">
        <div>Learn HTML</div>
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam quia
          atque doloribus, commodi sapiente ratione nihil!
        </div>

        <div className="flex justify-between">
          <div>Begginer</div>
          <div>6 lessons</div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
