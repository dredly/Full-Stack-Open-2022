from flask import request
from midi_app import app
from .audio_processing import (
    make_midi_file,
    make_file_with_fluidsynth,
)
from .file_management import upload_file
from .instruments import all_instruments

from .log import log
import time

# Health check to quickly verify if the API is running or not
@app.route("/", methods=["GET", "POST"])
def home():
    return {"marcus": "polus"}


@app.route("/api/make_midi", methods=["POST"])
def make_midi() -> dict:
    received_time = time.time()
    
    data = request.json
    section_data = data["sectionData"]
    note_bpms = data["noteBpms"]
    midi_filename = make_midi_file(section_data, note_bpms)
    midi_url = upload_file(midi_filename)

    resolved_time = time.time()

    log(f'Request received at {received_time}')
    log(f'Request resolved at {resolved_time}')
    log(f'Total MIDI processing time = {resolved_time - received_time}')

    return (
        {"url": midi_url}
        if midi_url != "error"
        else {"error": "Something went wrong with the file"}
    )

@app.route("/api/make_wav", methods=["POST"])
def make_wav() -> dict:
    received_time = time.time()
    
    
    data = request.json
    section_data = data["sectionData"]
    note_bpms = data["noteBpms"]
    instrument_vals = data["instruments"]
    wav_filename, midi_time_taken, audio_time_taken = make_file_with_fluidsynth(section_data, note_bpms, 'wav', instrument_vals)
    wav_url = upload_file(wav_filename)

    resolved_time = time.time()

    log(f'Request received at {received_time}')
    log(f'Request resolved at {resolved_time}')
    log(f'Total WAV processing time = {resolved_time - received_time}')

    return (
        {"url": wav_url}
        if wav_url != "error"
        else {"error": "Something went wrong with the file"}
    )


@app.route("/api/make_flac", methods=["POST"])
def make_flac() -> dict:
    data = request.json
    section_data = data["sectionData"]
    note_bpms = data["noteBpms"]
    instrument_vals = data["instruments"]
    flac_filename, midi_time_taken, audio_time_taken = make_file_with_fluidsynth(section_data, note_bpms, 'flac', instrument_vals)

    upload_start_time = time.time()
    flac_url = upload_file(flac_filename)
    upload_time_taken = time.time() - upload_start_time

    log(f'MIDI: {midi_time_taken}s --- FLAC: {audio_time_taken}s --- UPLOAD: {upload_time_taken}s')

    return (
        {"url": flac_url}
        if flac_url != "error"
        else {"error": "Something went wrong with the file"}
    )