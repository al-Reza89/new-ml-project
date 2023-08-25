/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import { Collection } from "@prisma/client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const OPTIONS = [
  "Adventure",
  "Horror",
  "Mystery",
  "ScienceFiction",
  "Fantasy",
  "Romance",
  "Thriller",
  "Crime",
  "Biography",
  "Comedy",
  "Science",
  "NonFiction",
  "Eassy",
  "SelfHelp",
];

interface HomePageProps {
  mlData: Partial<Collection> | any;
  userId: string;
}

const HomePage: React.FC<HomePageProps> = ({ mlData, userId }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  console.log({ mydata: mlData });

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const handleSubmit = useCallback(() => {
    if (selectedItems.length === 0) {
      toast.error("select some category");
    } else {
      setIsLoading(true);
      const data: any = {
        id: mlData?.id,
        Adventure: 0,
        Horror: 0,
        Mystery: 0,
        ScienceFiction: 0,
        Fantasy: 0,
        Romance: 0,
        Thriller: 0,
        Crime: 0,
        Biography: 0,
        Comedy: 0,
        Science: 0,
        NonFiction: 0,
        Eassy: 0,
        SelfHelp: 0,
        isValidate: 1,
        userId: userId,
      };

      for (const i of selectedItems) {
        data[i] = 1;
      }

      // console.log({ data: data });

      axios
        .put("/api/label-data", data)
        .then(() => {
          toast.success("submitted successfully");
          router.refresh();
          setSelectedItems([]);
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error("somethig went wrong");
        })
        .finally(() => {});
    }

    setIsLoading(false);
  }, [mlData?.id, router, selectedItems, userId]);

  return (
    <div className=" flex flex-col gap-5">
      <div>
        <div className="  collapse collapse-plus border border-base-300 bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            {mlData?.author}
          </div>
          <div className="collapse-content bg-base-100 ">
            <p className="pt-4">{mlData?.authorDescription}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col  justify-center items-center">
        <div className="  collapse collapse-plus border border-base-300 bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            {mlData?.title}
          </div>
          <div className="collapse-content bg-base-100  ">
            <div className=" sm:flex justify-center gap-6 pt-4 ">
              <img
                className="object-cover h-36 w-52 rounded-md "
                alt="book image"
                src={mlData?.imageUrl}
              />
              <div className="font-bold text-xl">Name: {mlData?.author} </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="bg-base-100 p-4 rounded-md">
            <p className="indent-8">{mlData?.summery}</p>
          </div>
          <div className="pt-4  md:flex md:items-center gap-4 ">
            <Select
              mode="multiple"
              placeholder="Inserted are removed"
              value={selectedItems}
              onChange={setSelectedItems}
              size="large"
              listItemHeight={240}
              style={{ width: "100%" }}
              options={filteredOptions.map((item) => ({
                value: item,
                label: item,
              }))}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`bg-green-600 h-10 w-full md:w-20 mt-6 md:gap-5 md:mt-0 rounded-sm text-white font-bold text-lg px-2 py-1  ${
                isLoading ? "cursor-not-allowed" : ""
              } `}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
