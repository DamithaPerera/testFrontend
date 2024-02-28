'use client';

import React from "react";
import Image from "next/image";
import ListIcon from "@/public/assets/side-nav/list.svg";
import MessageIcon from "@/public/assets/side-nav/text-bubble-plus.svg";
import AwardIcon from "@/public/assets/side-nav/award.svg";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
 
export function SideNavComponent() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
 
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-[calc(100vh-6rem)] w-full max-w-[20rem] pt-12 px-0 mt-24 shadow-xl shadow-blue-gray-900/5 " placeholder={undefined}>
      <div className="py-2 px-8">
        <Input icon={''} label="Search" crossOrigin={undefined} />
      </div>
      <List  placeholder={undefined} className="text-primary-blue text-sm pt-10 px-0">
        <p className="text-primary-blue text-xsm font-semibold pl-8">SETTINGS</p>
        <ListItem className="inline-flex pl-10 hover:bg-primary-blue hover:bg-opacity-20 rounded-none"  placeholder={undefined}>
          <ListItemPrefix  placeholder={undefined}>
            <Image src={ListIcon} alt={""}></Image>
          </ListItemPrefix>
          <p className="pt-1">Admin Settings</p>
        </ListItem>
        <ListItem className="inline-flex pl-10 hover:bg-primary-blue hover:bg-opacity-20 rounded-none"  placeholder={undefined}>
          <ListItemPrefix  placeholder={undefined}>
            <Image src={MessageIcon} alt={""}></Image>
          </ListItemPrefix>
          <p className="pt-1">Mesages</p>
        </ListItem>
        <ListItem className="inline-flex pl-10 hover:bg-primary-blue hover:bg-opacity-20 rounded-none"  placeholder={undefined}>
          <ListItemPrefix  placeholder={undefined}>
            <Image src={AwardIcon} alt={""}></Image>
          </ListItemPrefix>
          <p className="pt-1">Filter by Channel</p>
        </ListItem>
      </List>
    </Card>
  );
}