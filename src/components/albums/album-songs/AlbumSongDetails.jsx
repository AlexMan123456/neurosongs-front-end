import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getSongById } from "../../../../api";
import Loading from "../../Loading";
import { Typography } from "@mui/material";
import Markdown from "react-markdown";
import { formatMarkdownWithLineBreaks } from "#utils";

function AlbumSongDetails({song}){

    return (
        <>
            <h3>Song Description</h3>
            <Markdown>
                {formatMarkdownWithLineBreaks(song.description)}
            </Markdown>
        </>
    )
}

export default AlbumSongDetails