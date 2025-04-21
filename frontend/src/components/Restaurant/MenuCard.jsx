import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

 
export const MenuCard = () => {
    const food = {
        name: "Margherita Pizza",
        image:
          "https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ=",
        description: "Classic cheese and tomato pizza with a crispy crust.Classic cheese and tomato pizza with a crispy crust.Classic cheese ",
        price: 9.99,
        ingredients: "Tomato, mozzarella, basil, olive oil, salt, flour",
      };
    return (
      <div>
        <Accordion slotProps={{ heading: { component: "h4" } }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex flex-col">
                  <Typography variant="subtitle1" className="font-semibold">
                    {food.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {food.description}
                  </Typography>
                </div>
              </div>
              <Typography variant="subtitle1" className="font-bold text-green-600">
                ${food.price}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              <strong>Ingredients:</strong> {food.ingredients}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };