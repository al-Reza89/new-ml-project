/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import { Collection } from "@prisma/client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PulseLoader, ClipLoader } from "react-spinners";

const OPTIONS = [
  "Fiction",
  "NonFiction",
  "Drama",
  "Mystery",
  "Tragedy",
  "Thriller",
  "Motivational",
  "Romantic",
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
        Fiction: 0,
        NonFiction: 0,
        Drama: 0,
        Mystery: 0,
        Tragedy: 0,
        Thriller: 0,
        Motivational: 0,
        Romantic: 0,
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
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [mlData?.id, router, selectedItems, userId]);

  return (
    <div className=" flex flex-col gap-5">
      <div>
        <div className="  collapse collapse-plus border border-base-300 bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Instructions</div>
          <div className="collapse-content bg-base-100 ">
            <p className="pt-4">Please select multiple category </p>
            <p>
              1. কাব্য (Fiction): এটি কোনো বাস্তব কাহিনীর বর্ণ্না নয়, বরং
              কল্পনামূলক ঘটনা ও চরিত্রের সৃষ্টির মাধ্যমে তৈরি হওয়া গল্প।
            </p>
            <p>
              2. অকাব্য (Non-fiction): এটি কল্পনা নয়, প্রবৃত্তির-বাস্ততবে ঘটেছে
              এমন উপর ভিত্তি করে লেখা, যা সত্যকথা ও তথ্যে ভরপূর্ণ।
            </p>
            <p>
              3. নাটক (Drama): বর্ণ্না ভিত্তিক নাট্য যাতে একটি কাহিনী বা ঘটনা
              নায়ক-নায়িকার মাধ্যমে প্রদর্শন করা হয়।
            </p>
            <p>
              4. রহস্য (Mystery): গল্প কোনো অদ্ভুত ও সমাধান করা কঠিন ঘটনার
              চরিত্রের উপর ভিত্তি করা, যা পাঠকের প্রশ্ন ও চিন্তা সৃজন করে।
            </p>
            <p>
              5. বিপত্তি (Tragedy): যেখানে প্রধান চরিত্রের অসুস্থি ও কাহিনীর শেষ
              দিকে দু:খের সমাপ্তি সংঘটিত হয়।
            </p>
            <p>
              6. থ্রিলার (Thriller): ঘটনা চরম সতর্কতা, গল্পের গভীরতার সাথে গতি
              বা উত্তেজনা সৃষ্টি করে, পাঠকের কৌতুহল আর উদ্দীপনা তৈরি করে।
            </p>
            <p>
              7. উৎসাহপ্রদ (Motivational): অভিজ্ঞতা ও উৎসাহের মাধ্যমে পাঠককে
              উৎসাহিত করে এবং সাফল্যের দিকে অগ্রসর হতে প্রেরণা দেয়।
            </p>
            <p>
              8.প্রেমমূলক(Romantic) : গল্প মূলত প্রেম-ভালোবাসা ভিত্তিক করে লিখা
              , যেখানে নায়ক-নায়িকার প্রেম-ভালোবাসার বর্ণ্না গুলা মূখ্য থাকে ।
            </p>
          </div>
        </div>
      </div>
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
          <div className="text-gray-400  ">
            Please Select Multiple Category:
          </div>
          <div className="pt-4   md:flex md:items-center md:justify-center gap-4 ">
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
            {isLoading ? (
              <button
                className={`bg-green-900 h-10 w-full md:w-24 mt-6 md:gap-5 md:mt-0 rounded-sm text-white font-bold text-lg px-2 py-1 cursor-not-allowed `}
              >
                {/* <PulseLoader color="#f8f6fc" /> */}
                <ClipLoader color="#f8f6fc" size={25} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`bg-green-600 h-10 w-full md:w-20 mt-6 md:gap-5 md:mt-0 rounded-sm text-white font-bold text-lg px-2 py-1  ${
                  isLoading ? "cursor-not-allowed" : ""
                } `}
              >
                submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
