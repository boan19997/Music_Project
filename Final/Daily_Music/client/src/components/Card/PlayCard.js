import React from "react";
import { BsFillPlayFill, BsHeartFill } from "react-icons/bs";
import { RiPlayListAddFill } from 'react-icons/ri' ;
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import images from "../../assets/images";
import {
  addFavourites,
  addPlayList,
  getFavourites,
  addlistens,
} from "../../api";
import ModalSuccess from "../modalNotify/modalsucces";

function PlayCard({ data, index, id, rank }) {
  const [{ songIndex, isSongPlaying, user }, dispath] = useStateValue();
  let number = 1;

  const addToContext = () => {
    // console.log(id);
    if (!isSongPlaying) {
      addlistens(id).then((data) => {
        // console.log(data);
      });
      dispath({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    }

    if (songIndex !== index) {
      addlistens(id).then((data) => {
        // console.log(data);
      });
      dispath({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };
  const addToFavourites = (id) => {
    if (user.user.songs.includes(id)) {
      alert("Added Fauvorites");
    } else {
      let dataAdd = {
        id_user: user.user._id,
        id_music: id,
      };
      console.log(dataAdd);

      addFavourites(dataAdd).then((data1) => {
        console.log("datafavorite", data1);
        if (data1.success == true) {
          getFavourites(user.user._id).then((data) => {
            console.log("datafavorite", data.user.songs);
            dispath({
              type: actionType.SET_All_FAVORITE,
              listFauvorites: data.user.songs,
            });
          });
          alert("add success");
        }
        dispath({
          type: actionType.SET_ADD_FAVORITE,
          // user : data1.user,
        });
      });
    }
  };
  const addToPlayList = (id) => {
    if (user.user.playlist.includes(id)) {
      alert("Added playlist");
    } else {
      let dataAdd = {
        id_user: user.user._id,
        id_music: id,
      };
      console.log(dataAdd);

      addPlayList(dataAdd).then((data1) => {
        console.log("datalist", data1);
        if (data1.success == true) {
          getFavourites(user.user._id).then((data) => {
            console.log("datafplaylist", data.user.playlist);
            dispath({
              type: actionType.SET_All_PLAYLIST,
              listPlayList: data.user.playlist,
            });
          });
          alert("add success");
        }
        dispath({
          type: actionType.SET_ADD_FAVORITE,
          addPlayList: data1.success,
        });
      });
    }
  };

  return (
    <div>
      <div className="bg-gray-900 p-4 rounded-md flex-1 ">
        <div
          className="bg-gray-600 p-4 rounded-md flex-1 hover:bg-slate-200 "
          onClick={addToContext}
        >
          <div>
            <div className="pt-[100%] mb-4 relative">
              <img
                src={data.imageURL}
                alt="song"
                className="absolute inset-0 object-cover w-full h-full"
              />
              {/* button còn thiếu  */}
              <button className="w-10 h-10 rounded-full bg-red-500 absolute bottom-2 right-2 flex items-center justify-center group-hover:flex">
                <BsFillPlayFill />
              </button>
            </div>
            <div>
              <h5 className="truncate text-base font-bold font-sans">
                {" "}
                {data.name.length > 0
                  ? `${data.name.slice(0, 25)}..`
                  : data.name}
              </h5>
              <p className="overflow-hidden text-ellipsis whitespace-normal text-lime-100 text-sm font-medium font-sans mt-1">
                {data.artist && (
                  <>
                    {data.artist.length > 25
                      ? `${data.artist.slice(0, 25)}....`
                      : data.artist}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-around items-center mt-1.5">
          {rank === true ? (
            <div className={`cursor-pointer  duration-500 w-10 text-white`}>
              {index+1}
            </div>
          ) : (
            <></>
          )}
          <div className={`cursor-pointer items-center text-white duration-500 w-10  hover:text-red-500`} onClick={() => addToFavourites(data._id)}>
            <BsHeartFill/>
          </div>
          <div className={`cursor-pointer flex justify-end text-white duration-500 w-10 hover:text-blue-500`} onClick={() => addToPlayList(data._id)}>
            <RiPlayListAddFill/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayCard;
