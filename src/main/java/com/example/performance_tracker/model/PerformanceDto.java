package com.example.performance_tracker.model;

import java.sql.Date;
import java.sql.Timestamp;

public class PerformanceDto {

	private String agentid;
	private String firstname;
	private String surname;
	private Timestamp begin;
	private Timestamp end;
	private Date dateinfo;
	private String excuse;
	private Long excusehours;
	private Long timeout;
	
	public String getAgentid() {
		return agentid;
	}
	public void setAgentid(String agentid) {
		this.agentid = agentid;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public Timestamp getBegin() {
		return begin;
	}
	public void setBegin(Timestamp begin) {
		this.begin = begin;
	}
	public Timestamp getEnd() {
		return end;
	}
	public void setEnd(Timestamp end) {
		this.end = end;
	}
	public Date getDateinfo() {
		return dateinfo;
	}
	public void setDateinfo(Date dateinfo) {
		this.dateinfo = dateinfo;
	}
	public String getExcuse() {
		return excuse;
	}
	public void setExcuse(String excuse) {
		this.excuse = excuse;
	}
	public Long getExcusehours() {
		return excusehours;
	}
	public void setExcusehours(Long excusehours) {
		this.excusehours = excusehours;
	}
	public Long getTimeout() {
		return timeout;
	}
	public void setTimeout(Long timeout) {
		this.timeout = timeout;
	}
	
}
